"use client";
import { AddTaskForm } from "@/components/AddTaskForm";
import { Task, TaskItem } from "@/components/TaskItem";
import { TaskStats } from "@/components/TaskStats";
import { Button } from "@/components/ui/button";
import { CheckSquare, Sparkles, Trash2, History } from "lucide-react";
import { useState, useEffect } from "react";
import { TaskHistory } from "@/components/TaskHistory";

const API_BASE_URL = "http://localhost:3333/tasks";

export default function ContadorPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error("Falha ao carregar tarefas.");

      const data = await response.json();

      const fetchedTasks: Task[] = data.tasks.map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      }));
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (text: string) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Falha ao adicionar tarefa.");

      fetchTasks();
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  const toggleTask = async (id: string) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    if (!taskToToggle) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !taskToToggle.completed }),
      });

      if (!response.ok) throw new Error("Falha ao alternar status da tarefa.");

      fetchTasks();
    } catch (error) {
      console.error("Erro ao alternar status:", error);
    }
  };

  const editTask = async (id: string, newText: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newText }),
      });

      if (!response.ok) throw new Error("Falha ao editar tarefa.");

      fetchTasks();
    } catch (error) {
      console.error("Erro ao editar tarefa:", error);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.status !== 204) throw new Error("Falha ao excluir tarefa.");

      fetchTasks();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  };

  const clearCompletedTasks = () => {
    console.log(
      "Ação de limpar concluídas desabilitada. Requer endpoint no backend."
    );
  };

  const pendingTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  if (isLoading) {
    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
        <p className="text-xl text-primary font-semibold">
          Carregando tarefas...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {completedTasks.length > 0 && (
        <div className="text-right mb-4">
          <Button
            variant="default"
            onClick={clearCompletedTasks}
            className="hover:shadow-[var(--shadow-glow-destructive)] transition-all duration-300 hover:scale-105 opacity-50 cursor-not-allowed"
            disabled
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Limpar Concluídas (API Pendente)
          </Button>
        </div>
      )}
    </div>
  );
}
