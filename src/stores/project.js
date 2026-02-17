import { defineStore } from "pinia";
import api from "@/api/api";
import { showSuccess, showError } from '@/utils/toast'

export const useProjectStore = defineStore("project", () => {

  const CreateProject = async (payload) => {
    try {
      const responce = await api.post("/api/projects", payload);
      showSuccess(responce.data.message);
      return responce.data;
    } catch (err) {
      console.log("Create Project Error:", err);
      showError(err.response?.data?.message || 'Failed to create project');
      throw err;
    }
  };

  const UpdateProject = async (id, payload) => {
    try {
        const responce = await api.put(`/api/projects/${id}`, payload);
        showSuccess(responce.data.message);
        return responce.data;
    } catch (err) {
        showError(err.response?.data?.message || 'Failed to update project');
        throw err;
    }
  }

  const DeleteProject = async (id) => {
    try {
        const responce = await api.delete(`/api/projects/${id}`);
        showSuccess(responce.data.message);
        return responce.data;
    } catch (err) {
        showError(err.response?.data?.message || 'Failed to delete project');
        throw err;
    }
  }


  return {
    CreateProject,
    UpdateProject,
    DeleteProject
  };
});
