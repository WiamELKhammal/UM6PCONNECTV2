import React from "react";
import { Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";

const categories = [
  "Journal Article",
  "Conference Proceedings",
  "Datasets & Experiments",
  "Research & Findings",
  "Scientific Presentations",
  "Visual Posters",
  "Early Drafts & Preprints",
];

const ResearchSidebar = () => {
  return (
    <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
      <div style={{ padding: "16px" }}>
        <Typography variant="h6" fontWeight="bold">
          Research
        </Typography>
      </div>
      <List>
        {categories.map((category, index) => (
          <ListItem button key={index}>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default ResearchSidebar;
