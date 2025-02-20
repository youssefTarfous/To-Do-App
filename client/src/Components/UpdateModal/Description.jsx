import { useHandlers, useTasks } from '../../context/TaskProvider';

const Description = () => {
    const { state: { editedTask }} = useTasks();
    const { handleChangeUpdate} = useHandlers();
  return (
    <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={editedTask.description}
          onChange={handleChangeUpdate}
          className="w-full p-2 rounded-lg text-cyan-50 bg-cyan-950 border-2 border-cyan-50"
        />
      </div>
  )
}

export default Description