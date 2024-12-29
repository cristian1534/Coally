import React from "react";
import { UpdateTaskForm } from "../../../../components/UpdateForm";

const page = async ({ params }: { params: Promise<{ _id: string }> }) => {
  const taskId = (await params)._id;

  return (
    <div>
      <UpdateTaskForm taskId={taskId} />
    </div>
  );
};

export default page;
