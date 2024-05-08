import React, { useState } from "react";
import AutoForm from "./AutoForm";
import EditSections from "./EditSections";
import SelectSections from "./SelectSections";

const Auto = () => {
  const [create, setCreate] = useState<boolean>(false);
  const handleSuccess = () => setCreate(true);

  return (
    <div className="w-full h-full flex flex-col gap-[20px]">
      {create ? (
        <>
          <div className="w-full h-auto">
            <EditSections />
          </div>
          <div className="w-full h-auto">
            <SelectSections />
          </div>
        </>
      ) : (
        <AutoForm onClick={handleSuccess} />
      )}
    </div>
  );
};

export default Auto;
