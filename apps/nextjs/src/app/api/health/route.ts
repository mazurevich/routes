import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({
    service: "bike-routes-nextjs-server",
    status: "ok",
    timestamp: new Date().toISOString(),
  });
};
