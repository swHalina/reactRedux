import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";

function TaskForm() {
    const [task, setTask] = useState({
        title: "",
        description: "",
        categoria: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const tasks = useSelector((state) => state.tasks);
    const [country, setCountry] = useState([]);

    const handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setTask({
            ...task,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (params.id) {
            dispatch(editTask({ ...task, id: params.id }));
        } else {
            dispatch(
                addTask({
                    ...task,
                    id: uuid(),
                })
            );
        }

        navigate("/");
    };

    useEffect(() => {
        //Api Ejemplo

        // const getcountry = async () => {
        //     const req = await fetch("https://gateway.marvel.com:443/v1/public/characters?apikey=c65be3aa406833ec0e7af07822bca090");
        //     const getres = await req.json();
        //     console.log(getres);
        //     setCountry(await getres);

        // }
        // getcountry();

        if (params.id) {
            setTask(tasks.find((task) => task.id === params.id));
        }
    }, [params, tasks]);
    return (
        <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4">
            <label className="block text-sm font-bold">Task:</label>
            <input
                type="text"
                name="title"
                onChange={handleChange}
                value={task.title}
                className="w-full p-2 rounded-md bg-zinc-600 mb-2"
                placeholder="Write a title"
                autoFocus
            />
            <label className="block text-sm font-bold">Categoria:</label>
            <select
                name="categoria"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {task.categoria.length <= 0
                    ? <option hidden>Seleccione una categoria!</option>
                    : <option hidden>{task.categoria}</option>
                }
                {tasks.map(task => (
                    <option key={task.id} value={task.categoria}>{task.categoria}</option>
                ))};
            </select>
            <label>
                Description:
                <textarea
                    type="text"
                    name="description"
                    onChange={handleChange}
                    value={task.description}
                    className="w-full p-2 rounded-md bg-zinc-600 mb-2"
                    placeholder="Write a description"
                />
            </label>
            <button type="submit" className="bg-indigo-600 px-2 py-1">Submit</button>
        </form>
    );
}

export default TaskForm;