import ProgressHero from './ProgressHero';
import ResidencesInfrastructure from './ResidencesInfrastructure';
import TitleSection from './TitleSection';
import AcademicLife from './AcademicLife';
import AcademicLife2 from './AcademicLife2';

import AcademicGraphPage from './AcademicGraphPage';
import AcademicVideoPage from './AcademicVideoPage';
import Dinningandlifestyle from './Dinningandlifestyle';
import Wellness from './Wellness';
import Staffandfamilyservices from './Staffandfamilyservices';

import { Box } from '@mui/material'; //

const ProgressReport2021 = () => (
    <div className="bg-black text-white w-full overflow-x-hidden">
        <ProgressHero />


        <TitleSection title="Academic Life & Attractiveness" id="academic" number="01" />

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

        <AcademicVideoPage />

        <TitleSection
            title="Residences & Infrastructure"
            id="residences"
            number="02"
            borderTop
        />
        {/* Component for Residences goes here */}
        <ResidencesInfrastructure />
        <TitleSection title="Dining & Lifestyle" id="dining" number="03" borderTop
        />

        <Box sx={{ borderBottom: "1px solid #fff" }}>
            <Dinningandlifestyle />
        </Box>

        <Box sx={{ borderBottom: "1px solid #fff" }}>
            <AcademicGraphPage />
        </Box>

        <TitleSection title="Wellness & Sports" id="wellness" number="04" />

        <Box sx={{ borderBottom: "1px solid #fff" }}>
            <Wellness />
        </Box>
        <AcademicVideoPage />

        <TitleSection title="Staff & Family Services" id="staff" number="05" borderTop
        />

        <Box sx={{ borderBottom: "1px solid #fff" }}>
            <Staffandfamilyservices />
        </Box>


        <Box sx={{ borderBottom: "1px solid #fff" }}>
            <AcademicGraphPage />
        </Box>


    </div>
);

export default ProgressReport2021;
