import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getCookie } from "../Utils/cookieUtils";
import { useNavigate } from "react-router-dom";

export default function Home({ onHit }) {

  const [isJwtValidate,setIsJwtValidate] =useState(true);

  useEffect(() => {
    onHit();
    fetchTaskList();
    const resp = getCookie();
    resp.then((value)=> {
      if(!value.includes("validated")){
        setIsJwtValidate(true);
        toast.warning("login to continue");
        setTimeout(() => {
          navigator("/login");          
        }, 1500);        
      }else{
        setIsJwtValidate(false);
      }
    })

  }, []);

  const [openActionId, setOpenActionId] = useState(null);
  const [tasks, setTasks] = useState("");
  const [tasklist, setTasklist] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const addBtnRef = useRef();
  const inputRef = useRef();
  const navigator = useNavigate();

  var id = 0;

  // useEffect(()=>{
  //   console.log(tasklist);
  // },[tasklist])

  const toggleAction = (id) => {
    setOpenActionId(openActionId === id ? null : id);
  };

  const addTaskClicked = async () => {
    if (addBtnRef.current.innerText === "Add") {
      const resp = await axios.post(
        "https://todolist-backend-tes5.onrender.com/addTask",
        { task: tasks },
        { withCredentials: true }
      );
      console.log(resp.data);
      if (resp.data.includes("successfull")) {
        toast.success(resp.data);
        fetchTaskList();
        setTasks("");
      } else toast.error(resp.data);

    } else {
      const req = {
        id: selectedTaskId,
        task: tasks,
      };

      const request = JSON.stringify(req);
      console.log(request);
      const resp = await axios.post(
        "https://todolist-backend-tes5.onrender.com/updateTask",
        { request },
        { withCredentials: true }
      );
      console.log(resp.data);
      toast.loading(resp.data);
      toast.dismiss();
      setTasks("");
      addBtnRef.current.innerText = "Add";
      fetchTaskList();
    }
  };

  const fetchTaskList = async () => {
    const response = await axios.get("https://todolist-backend-tes5.onrender.com/fetchTasks", {
      withCredentials: true,
    });
    console.log(response.data);
    try {
      setTasklist(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const taskCompleted = async (id) => {
    const response = axios.post(
      "https://todolist-backend-tes5.onrender.com/taskCompleted",
      { id: id },
      { withCredentials: true }
    );
    console.log((await response).data);
    toast.success((await response).data);
    fetchTaskList();
  };

  const removeTask = async (id) => {
    console.log(id);
    const response = axios.delete("https://todolist-backend-tes5.onrender.com/removeTask", {
      withCredentials: true,
      data: { id: id },
    });
    console.log((await response).data);

    toast.warning((await response).data);
    fetchTaskList();
  };

  const updateTaskClick = async (id, task) => {
    addBtnRef.current.innerText = "Update";
    setTasks(task);
    setSelectedTaskId(id);
  };

  const inputOnChange = async (e) => {
    setTasks(e.target.value);    
    if (e.target.value === "") {
      addBtnRef.current.innerText = "Add";
    }
  };

  if(isJwtValidate){
    return (
        <>
          <div className="h-screen w-screen bg-slate-50"></div>
        </>
    )
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        reverseOrder={false}
        autoClose={1000}
      />
      <div className="w-screen h-screen bg-gray-100 flex flex-col justify-start space-y-0">
        <div className="w-screen h-16 bg-white flex items-center justify-center space-x-2 mt-8">
          <input
            type="text"
            id="task"
            name="task"
            placeholder="Enter your task"
            required
            value={tasks}
            className="w-2/3 p-2 rounded-lg bg-gray-100 text-gray-700 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#b5c99a]"
            onChange={(e) => {
              inputOnChange(e);
            }}
            ref={inputRef}
          />
          <button
            className="h-10 px-4 bg-[#709775] text-[#ffffff] rounded-lg hover:bg-[#a4c3b2] transition-all text-[0.8rem] sm:text-[1rem]"
            onClick={() => {
              addTaskClicked();
            }}
            ref={addBtnRef}
          >
            Add
          </button>
        </div>

        <div className="w-screen h-auto py-3 bg-white flex items-start justify-center px-2">
          <table className="min-w-full bg-white border border-gray-100 shadow-xl table-fixed">
            <thead>
              <tr className="text-gray-800">
                <th className="py-2 px-4 border-b border-gray-300 bg-gray-300 text-left text-[0.8rem] sm:text-[1rem]">
                  Id
                </th>
                <th className="py-2 px-4 border-b border-gray-300 bg-gray-300 text-left text-[0.8rem] sm:text-[1rem] w-9/12">
                  Tasks
                </th>
                <th className="py-2 px-4 border-b border-gray-300 bg-gray-300 text-left text-[0.8rem] sm:text-[1rem]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tasklist.map(
                (item) =>
                  item.active && (
                    <tr
                      key={item.id}
                      id={(id = id + 1)}
                      className="hover:bg-[#eaf4f4]"
                    >
                      <td className="py-2 px-4  text-black text-[0.8rem] sm:text-[1rem]">
                        {id}
                      </td>
                      <td className="py-2 px-4  text-black text-left text-[0.8rem] sm:text-[1rem]">
                        {item.task}
                      </td>
                      <td className="py-2 px-4  border-gray-300 text-[0.8rem] sm:text-[1rem]">
                        {/* Destop view*/}
                        <div className="hidden sm:inline-block space-x-2">
                          <button
                            className=" px-1 py-1 text-[0.8rem] sm:text-[1rem] bg-[#34a0a4] text-white"
                            onClick={() => taskCompleted(item.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                              />
                            </svg>
                          </button>
                          <button
                            className=" px-1 py-1 text-[0.8rem] sm:text-[1rem] bg-[#80b918] text-white"
                            id={item.id}
                            onClick={() => {
                              updateTaskClick(item.id, item.task);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                          </button>
                          <button
                            className=" px-1 py-1 text-[0.8rem] sm:text-[1rem] bg-[#ee6055] text-white"
                            onClick={() => {
                              removeTask(item.id);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* mobile view*/}
                        <div className=" sm:hidden relative">
                          <button
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={() => {
                              toggleAction(id);
                            }}
                          >
                            <svg
                              className="h-2 w-5 p-0"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                          </button>

                          {openActionId === id && (
                            <div
                              className="origin-top-righta absolute right-0 mt-1 w-16 rounded-md 
                                        shadow-lg bg-gray-50 ring-1 ring-black ring-opacity-5 z-10"
                            >
                              <div className="py-1">
                                <button
                                  className=" block size-9 px-1 py-1 mt-1 mx-auto text-[0.8rem] bg-[#34a0a4] text-white rounded-full "
                                  onClick={() => taskCompleted(item.id)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m4.5 12.75 6 6 9-13.5"
                                    />
                                  </svg>
                                </button>

                                <button
                                  className=" block size-9 px-1 py-1 mt-1 mx-auto text-[0.8rem] bg-[#80b918] text-white rounded-full"
                                  id={item.id} 
                                  onClick={() => {
                                    updateTaskClick(item.id, item.task);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                    />
                                  </svg>
                                </button>

                                <button
                                  className=" block size-9 px-1 py-1 mt-1 mx-auto text-[0.8rem] bg-[#ee6055] text-white rounded-full"
                                  onClick={() => {
                                    removeTask(item.id);
                                  }}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

Home.propTypes = {
  onHit: PropTypes.func, // Expecting a function, optional prop
};
