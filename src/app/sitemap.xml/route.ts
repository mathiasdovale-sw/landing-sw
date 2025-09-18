import { NextRequest, NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/api'
import { locales, defaultLocale } from '@/lib/i18n'
import { seoUrls, generateHreflangs, pagePriorities, changeFrequencies, getCanonicalBaseUrl } from '@/lib/seo-utils'

interface SitemapUrl {
  loc: string
  lastmod: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: string
  alternates?: Array<{ hreflang: string; href: string }>
}

export async function GET(request: NextRequest) {
  const baseUrl = getCanonicalBaseUrl()
  const lastmod = new Date().toISOString()
  
  const urls: SitemapUrl[] = []

  // Helper function to add page for both languages
  const addBilingualPage = (pageKey: keyof typeof seoUrls, priority: string, changefreq: any) => {
    const hreflangs = generateHreflangs(pageKey, baseUrl)
    
    // Spanish version
    urls.push({
      loc: `${baseUrl}/es${seoUrls[pageKey].es}`,
      lastmod,
      changefreq,
      priority,
      alternates: hreflangs
    })
    
    // English version
    urls.push({
      loc: `${baseUrl}/en${seoUrls[pageKey].en}`,
      lastmod,
      changefreq,
      priority,
      alternates: hreflangs
    })
  }

  // Homepage
  addBilingualPage('home', pagePriorities.home, changeFrequencies.home)

  // Main pages
  addBilingualPage('about', pagePriorities.about, changeFrequencies.about)
  addBilingualPage('contact', pagePriorities.contact, changeFrequencies.contact)
  addBilingualPage('blog', pagePriorities.blog, changeFrequencies.blog)

  // Service pages
  const servicePages: Array<keyof typeof seoUrls> = [
    'shopifyConsulting',
    'shopifyDesign', 
    'shopifyStoreSetup',
    'shopifyMigration',
    'shopifyThemeCustomization',
    'shopifySeo',
    'shopifyCro',
    'shopifyAbTesting',
    'shopifyGrowthPartner',
    'shopifyPlus'
  ]

  servicePages.forEach(page => {
    addBilingualPage(page, pagePriorities.services, changeFrequencies.services)
  })

  // Policy pages
  addBilingualPage('privacyPolicy', pagePriorities.policies, changeFrequencies.policies)
  addBilingualPage('cookiePolicy', pagePriorities.policies, changeFrequencies.policies)

  // Newsletter confirmation
  addBilingualPage('newsletterConfirmed', pagePriorities.newsletter, changeFrequencies.newsletter)

  // Blog posts - Get all posts and add them for both languages
  try {
    const posts = getAllPosts()
    posts.forEach(post => {
      const postDate = new Date(post.date).toISOString()
      const blogPostHreflangs = [
        { hreflang: 'es', href: `${baseUrl}/es/blog/${post.slug}` },
        { hreflang: 'en', href: `${baseUrl}/en/blog/${post.slug}` },
        { hreflang: 'x-default', href: `${baseUrl}/es/blog/${post.slug}` }
      ]
      
      // Spanish blog post
      urls.push({
        loc: `${baseUrl}/es/blog/${post.slug}`,
        lastmod: postDate,
        changefreq: changeFrequencies.blogPost,
        priority: pagePriorities.blogPost,
        alternates: blogPostHreflangs
      })

      // English blog post
      urls.push({
        loc: `${baseUrl}/en/blog/${post.slug}`,
        lastmod: postDate,
        changefreq: changeFrequencies.blogPost,
        priority: pagePriorities.blogPost,
        alternates: blogPostHreflangs
      })
    })
  } catch (error) {
    console.error('Error getting posts for sitemap:', error)
  }

  // Sort URLs by priority (highest first) and then alphabetically
  urls.sort((a, b) => {
    if (a.priority !== b.priority) {
      return parseFloat(b.priority) - parseFloat(a.priority)
    }
    return a.loc.localeCompare(b.loc)
  })

  // Generate XML sitemap with proper formatting
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>${url.alternates ? url.alternates.map(alt => `
    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`).join('') : ''}
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  })
}
