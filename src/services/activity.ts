import { Http } from './http'

export class ActivityService {
  static async getAllActivity() {
    const result = await Http.get<{ id: number; name: string }>(
      '/api/activities'
    )
    return result.data
  }

  static async createActivity(name: string) {
    await Http.post<{}>('/api/activity', { payload: { name } })
    return true
  }

  static async addUserActivity(userId: number, activityId: number) {
    await Http.post(`/api/user/${userId}/activity/${activityId}`)
  }

  static async getReport() {
    const result = await Http.get<{
      activity_name: number
      user_name: number
      first_occurrence: number
      last_occurrence: number
      amount: number
      id: number
    }[]>('/api/report')
    return result.data
  }
}
