


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


export function getTasks(month: string) {
  return useQuery({
    queryKey: ["tasks", { month }],
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey as [string, { month: string }];
      const { month } = params;
      const res = await axios.get("/v1/tasks", {
        params: {
          month: month, 
        }
      });

      if (!res.data) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await res.data;
      return data;
    },
  });
}

export function createTask(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTask: any) => {
      const res = await axios.post('/v1/tasks', newTask)

      console.log(res)

      if (!res.data) {
        throw new Error("Failed to create task");
      }

      const data = await res.data;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function updateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async({ id, updatedTask }: { id: string, updatedTask: any}) => {
      const res = await axios.put(`/v1/tasks/${id}`, updatedTask)

      if (!res.data) {
        throw new Error("Failed to update task");
      }

      const data = await res.data;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks']})
    }
  })
}