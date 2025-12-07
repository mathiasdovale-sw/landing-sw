"use client"
import BreadcrumbStructuredData from './breadcrumb-structured-data';
import useBreadcrumbs from '@/hooks/useBreadcrumbs';

const AutoBreadcrumbStructuredData = () => {
  const breadcrumbItems = useBreadcrumbs();
  
  return <BreadcrumbStructuredData items={breadcrumbItems} />;
};

export default AutoBreadcrumbStructuredData;