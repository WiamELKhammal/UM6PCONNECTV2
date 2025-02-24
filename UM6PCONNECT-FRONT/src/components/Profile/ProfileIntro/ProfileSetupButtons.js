import { Button } from "@mui/material";

const ProfileSetupButtons = ({ onPrevious, onNext, onSave, isLastStep }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
      {onPrevious && (
        <Button
          variant="contained"
          color="secondary"
          onClick={onPrevious}
          sx={{ padding: "8px 16px", fontSize: "14px", flex: 1, marginRight: "10px" }}
        >
          Previous
        </Button>
      )}
      {isLastStep ? (
        <Button
          variant="contained"
          color="primary"
          onClick={onSave}
          sx={{ padding: "8px 16px", fontSize: "14px", flex: 1 }}
        >
          Save
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          sx={{ padding: "8px 16px", fontSize: "14px", flex: 1 }}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default ProfileSetupButtons;
