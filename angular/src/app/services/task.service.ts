import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Task } from '../core/Task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'http://localhost:8224/api/tasks';

  constructor(private http: HttpClient) { }

  createTask(formData: FormData): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, formData);
  }


  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl);
  }
  searchTasks(keyword: string, searchBy: string): Observable<Task[]> {
    const url = `${this.baseUrl}/search`;
    return this.http.get<Task[]>(url, { params: { keyword: keyword, searchBy: searchBy } });
  }
  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${taskId}`);
  }

  updateTask(taskId: number, updatedTask: Task): Observable<Task> {
    const url = `${this.baseUrl}/${taskId}`;
    return this.http.put<Task>(url, updatedTask);
  }

  getTaskById(taskId: number): Observable<Task> {
    const url = `${this.baseUrl}/${taskId}`;
    return this.http.get<Task>(url);
  }
  downloadTaskFile(taskId: number, fileName: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${taskId}/attachment/download`, { responseType: 'blob' });
  }
}
