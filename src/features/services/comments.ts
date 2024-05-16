import { YggdrasilApi } from '../../apis/yggdrasil';

export interface ICreateAndUpdateComments {
  postId: string;
  message: string;
}

export interface IResponseComments extends ICreateAndUpdateComments {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export class CommentsService {
  public static async create(payload: ICreateAndUpdateComments): Promise<IResponseComments> {
    return (await YggdrasilApi.post('/comments', payload)).data;
  }

  public static async getAll(): Promise<IResponseComments[]> {
    return (await YggdrasilApi.get('/comments')).data;
  }

  public static async getByPostId(postId: string): Promise<IResponseComments[]> {
    return (await YggdrasilApi.get(`/comments/posts/${postId}`)).data;
  }

  public static async update(commentId: string, payload: ICreateAndUpdateComments): Promise<IResponseComments> {
    return (await YggdrasilApi.put(`/comments/${commentId}`, payload)).data;
  }

  public static async delete(commentId: string): Promise<void> {
    await YggdrasilApi.delete(`/comments/${commentId}`);
  }
}
