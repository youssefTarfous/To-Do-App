import { useHandlers, useTasks } from '../../context/TaskProvider';

const Priority = () => {
    const { state: { editedTask }} = useTasks();
    const { handleChangeUpdate} = useHandlers();
  return (
    <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Priority :</label>
        <div className="w-full flex justify-center flex-col">
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChangeUpdate}
            className="w-full max-w-md border-2 p-3 border-sky-50 bg-cyan-950 rounded-3xl text-sky-50"
          >
            <option value="low" className="text-cyan-50">
              Low
            </option>
            <option value="medium" className="text-cyan-50">
              Medium
            </option>
            <option value="high" className="text-cyan-50">
              High
            </option>
          </select>
        </div>
      </div>
  )
}

export default Priority