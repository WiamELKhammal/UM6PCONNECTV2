import ProgressHero from './ProgressHero';
import ResidencesInfrastructure from './ResidencesInfrastructure';
import TitleSection from './TitleSection';
import AcademicLife from './AcademicLife';
import AcademicLife2 from './AcademicLife2';
import AcademicLife3 from './AcademicLife3';

import AcademicGraphPage from './AcademicGraphPage';
import AcademicVideoPage from './AcademicVideoPage';
import Dinningandlifestyle from './Dinningandlifestyle';
import Wellness from './Wellness';
import Staffandfamilyservices from './Staffandfamilyservices';

import { Box } from '@mui/material'; //

const ProgressReport2021 = () => (
    <div className="bg-black text-white w-full overflow-x-hidden">

        <Box sx={{ borderBottom: "1px solid #FFF" }}>
        <ProgressHero />
        </Box>
        <TitleSection title="Academic Life & Attractiveness" id="academic"  />
        <Box sx={{ borderBottom: "1px solid #FFF" }}>
            <AcademicLife2 />
        </Box>
        {/* ✅ AcademicLife with bottom border */}
        <Box sx={{ borderBottom: "1px solid #FFFF" }}>
            <AcademicLife />
        </Box>

               {/* ✅ AcademicGraphPage with bottom border */}
            <AcademicGraphPage />
        
        <TitleSection title="More Than a Campus—It’s a Way of Life" id="dining"  borderTop
        />
            <AcademicLife3 />

 





    </div>
);

export default ProgressReport2021;
