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
        <ProgressHero />


        <TitleSection title="Academic Life & Attractiveness" id="academic"  />

        {/* ✅ AcademicLife with bottom border */}
        <Box sx={{ borderBottom: "1px solid #fff" }}>
            <AcademicLife />
        </Box>
        <Box sx={{ borderBottom: "1px solid #fff" }}>
            <AcademicLife2 />
        </Box>
               {/* ✅ AcademicGraphPage with bottom border */}
               <Box sx={{ borderBottom: "1px solid #fff" }}>
            <AcademicGraphPage />
        </Box>
        <TitleSection title="BLABLA" id="dining"  borderTop
        />
        <Box sx={{ borderBottom: "1px solid #fff" }}>
            <AcademicLife3 />
        </Box>

 





    </div>
);

export default ProgressReport2021;
