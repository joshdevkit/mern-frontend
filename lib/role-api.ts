import http from "./utils";

export const fetchRoles = async () => {
  try {
    const response = await http.get("/users/admin/roles");
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching roles:", error);
    return [];
  }
};

export const createRole = async (roleData: any) => {
  try {
    const response = await http.post("/users/admin/create-roles", roleData);
    return response.data;
  } catch (error) {
    console.error("Error creating role:", error);
    return { success: false, message: "Failed to create role" };
  }
};
