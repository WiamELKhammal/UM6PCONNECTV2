import MeetEngageR5 from './MeetEngageR5';
import MeetEngageR4 from './MeetEngageR4';
import MeetEngageR3 from './MeetEngageR3';
import MeetEngageR2 from './MeetEngageR2';
import MeetEngageR1 from './MeetEngageR1';
import MeetEngageR6 from './MeetEngageR6';

import { Box } from '@mui/material';
import TitleSection from './TitleSection';
const MeetEngageR = () => (
  <div className="bg-black text-white w-full overflow-x-hidden">
    <MeetEngageR1 />

    {/* The Why Section */}
    <TitleSection title="Water Resilience & Smart Irrigation" id="WATER" number="01"  />
    <MeetEngageR2 />
    <TitleSection title="Green Ammonia & Phosphate Battery Inputs" id="GREEN" number="02" borderTop />
    <MeetEngageR3 />
    <TitleSection title="Food Security & Desert Agriculture" id="FOOD" number="03" borderTop />
    <MeetEngageR4 />
    <TitleSection title="AI for Climate, Health & Governance" id="IA" number="04" borderTop />
    <MeetEngageR5 />
    <TitleSection title="Precision Biotech for African Health Challenges" id="BIOTECH" number="05" borderTop />
    <MeetEngageR6 />
  </div>
);

export default MeetEngageR;
