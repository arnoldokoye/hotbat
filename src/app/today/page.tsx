import { TodayGamesPage } from "@/features/today-games/TodayGamesPage";
import { fetchTodayGames } from "@/lib/api/todayGames";

export default async function TodayPage() {
  const data = await fetchTodayGames();
  return <TodayGamesPage initialData={data} />;
}
