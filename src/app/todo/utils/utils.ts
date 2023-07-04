import { CollectionName } from 'src/app/shared/enum/collection-name';

export function unselectAll(
  collectionName: CollectionName,
  context: {
    checkAllTodo: boolean;
    checkAllInProgress: boolean;
    checkAllDone: boolean;
  }
) {
  if (collectionName === CollectionName.todo) {
    context.checkAllTodo = false;
  }
  if (collectionName === CollectionName.inProgress) {
    context.checkAllInProgress = false;
  }
  if (collectionName === CollectionName.done) {
    context.checkAllDone = false;
  }
}

export function getCollectionNameFromString(query: string) {
  let collectionName = CollectionName.todo;

  if (query === 'todo') {
    collectionName = CollectionName.todo;
  }
  if (query === 'inProgress') {
    collectionName = CollectionName.inProgress;
  }
  if (query === 'done') {
    collectionName = CollectionName.done;
  }
  return collectionName;
}
