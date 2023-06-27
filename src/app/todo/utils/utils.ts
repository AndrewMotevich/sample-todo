import { CollectionName } from 'src/app/shared/models/colection-name.model';

export function unselectAll(
  collectionName: CollectionName,
  context: { checkAllTodo: boolean; checkAllInProgress: boolean; checkAllDone: boolean }
) {
  collectionName === 'todo' && (context.checkAllTodo = false);
  collectionName === 'inProgress' && (context.checkAllInProgress = false);
  collectionName === 'done' && (context.checkAllDone = false);
}

export function getCollectionNameFromString(query: string) {
  if (query === 'todo') return CollectionName.todo;
  if (query === 'inProgress') return CollectionName.inProgress;
  if (query === 'done') return CollectionName.done;
  return CollectionName.todo;
}
