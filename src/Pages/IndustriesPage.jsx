import React, { useState } from 'react';
import {
  PageWrapper,
  SectionHeading,
  IndustryCard,
  CardDetailModal,
} from '../Components/Common';
import { INDUSTRIES_CONTENT } from '../data/industries';
import { PAGE_SEO } from '../data/seo';
import { resolveMetric } from '../data/metrics';
import { Building2, Factory, Truck } from 'lucide-react';

const SECTOR_ICONS = {
  'construction-steel-buildings': Building2,
  'manufacturing-fabrication': Factory,
  distribution: Truck,
};

const IndustriesPage = () => {
  const [activeIndustryId, setActiveIndustryId] = useState(null);

  const industriesList = INDUSTRIES_CONTENT.industries;
  const activeIndustryRaw = industriesList.find((ind) => ind.id === activeIndustryId) || null;

  const activeIndustryData = activeIndustryRaw
    ? {
        ...activeIndustryRaw,
        icon: SECTOR_ICONS[activeIndustryRaw.id] || Factory,
        impact: resolveMetric(
          activeIndustryRaw.id === 'construction-steel-buildings'
            ? 'construction_steel_kickoff'
            : activeIndustryRaw.id === 'manufacturing-fabrication'
            ? 'fabrication_packet_time'
            : 'distribution_accounting_savings',
          activeIndustryRaw.impact
        ),
      }
    : null;

  return (
    <PageWrapper seo={PAGE_SEO.industries}>
      {/* Industries We Serve Section (Exact same as was on Home Page) */}
      <section id="industries" className="pt-28 sm:pt-36 pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8 bg-[#F6F7F9] font-sans">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            badge={INDUSTRIES_CONTENT.hero.badge}
            title={INDUSTRIES_CONTENT.hero.title}
            subtitle={INDUSTRIES_CONTENT.hero.subtitle}
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
            {industriesList.map((ind) => (
              <IndustryCard
                key={ind.id}
                id={ind.id}
                title={ind.title}
                tagline={ind.tagline}
                problem={ind.problem}
                onOpenModal={(id) => setActiveIndustryId(id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal Dialog for Industry Detailed View */}
      <CardDetailModal
        isOpen={Boolean(activeIndustryId)}
        onClose={() => setActiveIndustryId(null)}
        data={activeIndustryData}
        type="industry"
      />
    </PageWrapper>
  );
};

export default IndustriesPage;
