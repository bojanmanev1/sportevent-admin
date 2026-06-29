import { onCall, HttpsError } from "firebase-functions/v2/https";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const analyticsDataClient = new BetaAnalyticsDataClient();

export const getAnalytics = onCall(
  {
    region: "europe-west1",
  },

  async (_request) => {
    try {

      const [last30Days] =
        await analyticsDataClient.runReport({
          property: "properties/533021742",

          dateRanges: [
            {
              startDate: "30daysAgo",
              endDate: "today",
            },
          ],

          metrics: [
            { name: "activeUsers" },
            { name: "screenPageViews" },
          ],
        });

      return {
        users30Days:
          Number(
            last30Days.rows?.[0]
              ?.metricValues?.[0]?.value || 0
          ),
      };

    } catch (error) {

      console.error("ANALYTICS ERROR:", error);

      throw new HttpsError(
        "internal",
        "Analytics failed"
      );
    }
  }
);