import OurVisionHero from './OurVisionHero';
import TitleSection from './TitleSection';

import TheWhy from './Sections/Section1/TheWhy';
import TheWhyVideo from './Sections/Section1/TheWhyVideo';

import Pilar1 from './Sections/Section2/Pilar1';
import Pilar1Graph from './Sections/Section2/Pilar1Graph';

import Pilar2 from './Sections/Section2/Pilar2';
import Pilar2Graph from './Sections/Section2/Pilar2Graph';
import Pilar2Video from './Sections/Section2/Pilar2Video';

import Pilar3 from './Sections/Section2/Pilar3';
import Pilar3Graph from './Sections/Section2/Pilar3Graph';
import Pilar3Video from './Sections/Section2/Pilar3Video';

import Pilar4 from './Sections/Section2/Pilar4';
import Pilar4Graph from './Sections/Section2/Pilar4Graph';
import Pilar4Video from './Sections/Section2/Pilar4Video';

import { Box } from '@mui/material';

const ProgressReport2021 = () => (
  <div className="bg-black text-white w-full overflow-x-hidden">
    <OurVisionHero />

    {/* The Why Section */}
    <TitleSection title="The Why Behind Vision 2030" id="why"  />
    <Box sx={{ borderBottom: "1px solid #fff" }}>
      <TheWhy />
    </Box>

    {/* Pillar 1: Research */}
    <TitleSection title="Pillar 1: Research — Inventing What’s Next" id="pillar1"  borderTop />
    <Pilar1 />
    <Pilar1Graph />

    {/* Pillar 2: Education */}
    <TitleSection title="Pillar 2: Education — Learning to Lead" id="pillar2"  borderTop />
    <Pilar2 />


    {/* Pillar 3: Entrepreneurship */}
    <TitleSection title="Pillar 3: Entrepreneurship — Building What Matters" id="pillar3"  borderTop />
    <Pilar3 />


    {/* Pillar 4: Social Impact */}
    <TitleSection title="Pillar 4: Social Impact — Turning Knowledge into Action" id="pillar4"  borderTop />
    <Pilar4 />
  
  </div>
);

export default ProgressReport2021;
