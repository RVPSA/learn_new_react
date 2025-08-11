import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addTodo, fetchTodos, fetchTodo } from "../api";

function ReactQueryExamples() {
  const queryClient = useQueryClient();
  const [value, setValue] = useState("");
  const [todoID, setTodoID] = useState(0);
  const [manualtodoID, setManualTodoID] = useState(0);
  const [todo2, setTodo2] = useState<any>();

  //Query all data when loading
  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchTodos(),
  });

  //Get Data when changing state
  const { data: todo1 } = useQuery({
    queryKey: ["todos1", { todoID }],
    queryFn: () => fetchTodo(todoID),
    enabled: !!todoID,
  });

  //Manually passing parameters
  const findTodo2 = async (manualtodoID: number) => {
    try {
      // queryClient.fetchQuery will check the cache first, then fetch if needed.
      // It returns a promise that resolves with the data.
      const data = await queryClient.fetchQuery({
        queryKey: ["manualUserFetch", manualtodoID], // Unique key for this manual fetch
        queryFn: () => fetchTodo(manualtodoID),
        // You can add options like staleTime, cacheTime etc. here if different
        // from defaultOptions defined in your QueryClient setup.
      });
      setTodo2(data?.title);
    } catch (error) {
      console.error("Error fetching user via client:", error);
    } finally {
    }
  };

  //Post data
  const { mutateAsync: addTodoMuta, isPending } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleClick = async () => {
    try {
      await addTodoMuta(value);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <>Loading ...</>;
  if (isPending) return <>Loading2 ...</>;

  return (
    <>
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleClick}>Add To do</button>
      </div>
      {todos?.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
      <div>{todo1 && <>{todo1.title}</>}</div>
      <div>
        <input
          type="number"
          value={todoID}
          onChange={(e) => setTodoID(e.target.valueAsNumber)}
        />
        {/* <button onClick={handleSearchTodd}>Add To do</button> */}
      </div>
      <hr></hr>
      <div>{todo2 && <>{todo2}</>}</div>
      <div>
        <input
          type="number"
          value={manualtodoID}
          onChange={(e) => setManualTodoID(e.target.valueAsNumber)}
        />
        <button onClick={() => findTodo2(manualtodoID)}>Add To do</button>
      </div>
    </>
  );
}
export default ReactQueryExamples;
