"use client"
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";
import { useLanguage } from "@/contexts/LanguageContext";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  const { t } = useLanguage();
  
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <div className="flex items-center">
          <span className="text-gray-500 mr-2">{t('blog.by')}</span>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0 rounded-lg overflow-hidden shadow-lg">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <div className="flex items-center">
            <span className="text-gray-500 mr-2">{t('blog.by')}</span>
            <Avatar name={author.name} picture={author.picture} />
          </div>
        </div>
        <div className="mb-6 text-lg text-gray-600 border-b border-gray-200 pb-6">
          <span className="text-gray-500">{t('blog.publishedOn')} </span>
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
