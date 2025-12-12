export interface RepositoryInterface<T> {
  create(data: T): Promise<T>;
  findOne(id: string): Promise<T>;
  findAll(): Promise<T[] | null>;
  update(data: T): Promise<void>;
  delete(id: string): Promise<void>;
}
