// src/shared/types.ts

import { BrowserWindow } from 'electron';

export type TId = number;

export interface ITask {
  id: TId;
  title: string;
  description?: string;
  createdAt: Date;
  dueDate?: Date;
  completedAt?: Date;
  deletedAt?: Date;
  tags?: string[];
}

export interface IDeletedTask extends Omit<ITask, 'deletedAt'> {
  deletedAt: Date;
}

export interface ICompletedTask extends Omit<ITask, 'completedAt'> {
  completedAt: Date;
}

export interface ICompletedTaskTimeAndId {
  id: TId;
  completedAt: string;
}

export interface IDeletedTaskTimeAndId {
  id: TId;
  deletedAt: string;
}

export interface ITaskForRedux
  extends Omit<ITask, 'createdAt' | 'dueDate' | 'completedAt' | 'deletedAt'> {
  createdAt: string;
  dueDate?: string;
  completedAt?: string;
  deletedAt?: string;
}

export interface ITaskData {
  title: string;
  description?: string;
  dueDate?: Date;
  tags?: TTag[];
}

export interface IWindowState {
  id: number;
  bounds: { width: number; height: number; x: number; y: number };
  isVisible: boolean;
  webContents: BrowserWindow['webContents'] | null;
  isFullScreen: boolean;
}

export type TTag = string;
