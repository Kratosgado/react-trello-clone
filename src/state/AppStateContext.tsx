import React, { createContext, ReactNode, useContext, Dispatch, useEffect } from 'react';
import { appStateReducer, AppState, List, Task } from './appStateReducer';
import { Action } from './actions';
import { useImmerReducer } from 'use-immer';
import { DragItem } from '../DragItem';
import { save } from '../api';
import { withInitialState } from '../withInitialState';

const appData: AppState = {
  draggedItem: null,
  lists: [
    {
      id: '0',
      text: 'To Do',
      tasks: [{ id: 'c0', text: 'Generate app scaffold' }]
    },
    {
      id: '1',
      text: 'In Progress',
      tasks: [{ id: 'c2', text: 'Learn Typescript' }]
    },
    {
      id: '2',
      text: 'Done',
      tasks: [{ id: 'c3', text: 'Begin to use static typing' }]
    }
  ]
};

type AppStateContextProps = {
  draggedItem: DragItem | null
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};


const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

export const useAppState = (): AppStateContextProps => {
  return useContext(AppStateContext);
};

type AppStateProviderProps = {
  children: ReactNode;
  initialState: AppState;
};

export const AppStateProvider = withInitialState<AppStateProviderProps>(({ children, initialState }) => {
  const [state, dispatch] = useImmerReducer(appStateReducer, initialState);
  const { draggedItem, lists } = state;

  const getTasksByListId = (id: string) => {
    return lists.find((list) => list.id === id)?.tasks || [];
  };

  useEffect(() => {
    save(state)
  }, [state] )
  return (
    <AppStateContext.Provider value={{ draggedItem, lists, getTasksByListId, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
});
