import { TodayGamesPage } from "@/features/today-games/TodayGamesPage";
import { fetchTodayGames } from "@/lib/api/todayGames";
import { headers } from "next/headers";

// App Router passes searchParams as a resolved object (not a Promise) in this Next.js version.
type TodayPageProps =
  | {
      searchParams?: {
        date?: string;
      };
    }
  | {
      searchParams?: Promise<{
        date?: string;
      }>;
    };

export default async function TodayPage({ searchParams }: TodayPageProps) {
  const params =
    searchParams && typeof (searchParams as Promise<unknown>).then === "function"
      ? await (searchParams as Promise<{ date?: string }>)
      : (searchParams as { date?: string } | undefined) ?? {};
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const baseUrl = host ? `${protocol}://${host}` : undefined;

  let data;
  try {
    data = await fetchTodayGames(params?.date, baseUrl);
  } catch (error) {
    console.error("today page fetch error", error);
    data = {
      date: params?.date ?? "",
      games: [],
    };
  }
  return <TodayGamesPage initialData={data} />;
}
