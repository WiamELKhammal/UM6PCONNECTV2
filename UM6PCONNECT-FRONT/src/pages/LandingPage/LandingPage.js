import LandingPage2 from './LandingPage2';
import LandingPage3 from './LandingPage3';
import LandingPage4 from './LandingPage4';
import LandingPage5 from './LandingPage5';

import { Box } from '@mui/material';
import TitleSection from './TitleSection';
const ProgressReport2021 = () => (
  <div className="bg-black text-white w-full overflow-x-hidden">
    <LandingPage2 />

    {/* The Why Section */}
    <TitleSection title="Step into the movement" id="why" number="01" />
      <LandingPage4 />
    

    <TitleSection title="A voice for knowledge, a vision for Africa" id="pillar1" number="02" borderTop />
    <LandingPage5 />



  </div>
);

export default ProgressReport2021;
