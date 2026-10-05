import React, { useState } from 'react';
import {
  PageWrapper,
  SectionHeading,
  CaseStudyCard,
  CardDetailModal,
} from '../Components/Common';
import { CASE_STUDIES_CONTENT } from '../data/caseStudies';
import { PAGE_SEO } from '../data/seo';
import { resolveMetric } from '../data/metrics';

const CaseStudiesPage = () => {
  const [activeCaseStudyId, setActiveCaseStudyId] = useState(null);

  const caseStudiesList = CASE_STUDIES_CONTENT.caseStudies;
  const activeCaseStudyRaw = caseStudiesList.find((cs) => cs.id === activeCaseStudyId) || null;

  const activeCaseStudyData = activeCaseStudyRaw
    ? {
        ...activeCaseStudyRaw,
        resultMetric: resolveMetric(
          activeCaseStudyRaw.id === 'case-dealer-orders'
            ? 'dealer_orders_processing'
            : activeCaseStudyRaw.id === 'case-quote-to-work-order'
            ? 'quote_to_work_order_time'
            : null,
          activeCaseStudyRaw.result
        ),
      }
    : null;

  return (
    <PageWrapper seo={PAGE_SEO.caseStudies}>
      {/* Real-World Case Studies Section (Exact same as was on Home Page) */}
      <section id="case-studies" className="pt-28 sm:pt-36 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-white font-sans">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge={CASE_STUDIES_CONTENT.hero.badge}
            title={CASE_STUDIES_CONTENT.hero.title}
            subtitle={CASE_STUDIES_CONTENT.hero.subtitle}
            theme="light"
          />

          {/* Grid of Clean Resting Cards with Modal Dialog on Click */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            {caseStudiesList.map((caseStudy) => (
              <CaseStudyCard
                key={caseStudy.id}
                id={caseStudy.id}
                title={caseStudy.title}
                client={caseStudy.client}
                industry={caseStudy.industry}
                problem={caseStudy.problem}
                problemSummary={caseStudy.problem}
                resultMetric={caseStudy.result}
                onOpenModal={(id) => setActiveCaseStudyId(id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal Dialog for Case Study Detailed View */}
      <CardDetailModal
        isOpen={Boolean(activeCaseStudyId)}
        onClose={() => setActiveCaseStudyId(null)}
        data={activeCaseStudyData}
        type="case-study"
      />
    </PageWrapper>
  );
};

export default CaseStudiesPage;
