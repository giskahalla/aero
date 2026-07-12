

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function getTeams(params : { id?: number, keyword?: string, page?: number } = {}) {
  return useQuery({
    queryKey: ["teams", params],
    queryFn: async ({ queryKey }) => {
      const [, params] = queryKey as [string, { id?: number, keyword?: string }];
      const res = await axios.get("/v1/teams", { params });

      if (!res.data) {
        throw new Error("Failed to fetch teams");
      }

      return res.data;
    },
  });
}

export function createTeam(){
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTeam: any) => {
      const res = await axios.post('/v1/teams', newTeam)

      if (!res.data) {
        throw new Error("Failed to create team");
      }

      const data = await res.data;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
}
