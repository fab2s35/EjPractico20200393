import { useState, useEffect } from 'react';
import { DataSourceCache } from '@toolpad/core/Crud';

const API = "https://retoolapi.dev/6QbyzP/cursos-online";

export const useCursosDataSource = (router) => {
  const [curso, setCurso] = useState(null);
  const cursosCache = new DataSourceCache();

  const isCreating = router.pathname === '/cursos/new';
  const isEditing = /^\/cursos\/\d+\/edit$/.test(router.pathname);

  const match = router.pathname.match(/\/cursos\/(\d+)\/edit/);
  const cursoId = match ? match[1] : null;

  const dataSource = {
    fields: [
      { field: 'id', headerName: 'ID' },
      { field: 'curso', headerName: 'Curso', flex: 1 },
      { field: 'tematica', headerName: 'Temática', flex: 1 },
      { field: 'instructor', headerName: 'Instructor', flex: 1 },
      { field: 'descripcion', headerName: 'Descripción', flex: 2 },
    ],

    getMany: async ({ paginationModel }) => {
      const response = await fetch(API);
      const data = await response.json();
      const start = paginationModel?.page * paginationModel?.pageSize || 0;
      const end = start + (paginationModel?.pageSize || data.length);
      return {
        items: data.slice(start, end),
        itemCount: data.length,
      };
    },

    getOne: async (id) => {
      const response = await fetch(`${API}/${id}`);
      if (!response.ok) throw new Error("Curso no encontrado");
      return await response.json();
    },

    createOne: async (data) => {
      const response = await fetch(API, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al crear el curso");
      return await response.json();
    },

    updateOne: async (id, data) => {
      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error al actualizar el curso");
      return await response.json();
    },

    deleteOne: async (id) => {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el curso");
    },

    validate: (formValues) => {
      const issues = [];
      if (!formValues.curso) issues.push({ message: "El curso es obligatorio", path: ["curso"] });
      if (!formValues.tematica) issues.push({ message: "La temática es obligatoria", path: ["tematica"] });
      if (!formValues.instructor) issues.push({ message: "El instructor es obligatorio", path: ["instructor"] });
      if (!formValues.descripcion) issues.push({ message: "La descripción es obligatoria", path: ["descripcion"] });
      return { issues };
    },
  };

  useEffect(() => {
    if (isEditing && cursoId) {
      dataSource.getOne(cursoId)
        .then(setCurso)
        .catch(console.error);
    }
  }, [isEditing, cursoId]);

  return {
    curso,
    isCreating,
    isEditing,
    cursoId,
    dataSource,
    cursosCache,
  };
};
