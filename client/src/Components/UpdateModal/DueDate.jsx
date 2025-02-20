import { useHandlers, useTasks } from '../../context/TaskProvider';

const DueDate = () => {
    const { state: { editedTask }} = useTasks();
    const { handleChangeUpdate} = useHandlers();
  return (
    <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Due Date :</label>
        <input
          type="date"
          name="dueDate"
          value={editedTask.due}
          onChange={handleChangeUpdate}
          className="w-full max-w-md border-2 p-3 border-sky-50 bg-cyan-950 rounded-3xl text-sky-50"
          required
        />
      </div>
  )
}

export default DueDate