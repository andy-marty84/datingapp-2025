import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LikeParams, Member } from '../../types/members';
import { PaginatedResult } from '../../types/pagination';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  likeIds = signal<string[]>([]);

  toggleLike(targetMemberId: string) {
    return this.http.post(`${this.baseUrl}likes/${targetMemberId}`, {}).subscribe({
      next: () => {
        if (this.likeIds().includes(targetMemberId)) {
          this.likeIds.update(ids => ids.filter(x => x !== targetMemberId));
        } else {
          this.likeIds.update(ids => [...ids, targetMemberId]);
        }
      }
    })
  }

  getLikes(likeParams: LikeParams) {
    let params = new HttpParams();

    params = params.append('pageNumber', likeParams.pageNumber);
    params = params.append('pageSize', likeParams.pageSize);
    params = params.append('predicate', likeParams.predicate);

    return this.http.get<PaginatedResult<Member>>(this.baseUrl + 'likes', {params});
  }

  getLikeIds() {
    // We subscribe to this one because we're going to use this to set the like ids inside our service
    return this.http.get<string[]>(this.baseUrl + 'likes/list').subscribe({
      next: ids => this.likeIds.set(ids)
    });
  }

  clearLikeIds() {
    this.likeIds.set([]);
  }
}
