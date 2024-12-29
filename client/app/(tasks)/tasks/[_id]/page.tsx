import React from "react";
import { UpdateTaskForm } from "../../../../components/UpdateForm";

const page = ({ params }: { params: { _id: string } }) => {
  const taskId = params._id;
  
  return (
    <div>
      <UpdateTaskForm taskId={taskId} />
    </div>
  );
};

export default page;
