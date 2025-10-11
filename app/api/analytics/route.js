import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const daysParam = searchParams.get('days') || '30';
    const days = parseInt(daysParam);

    const validDays = [1, 7, 30];
    const selectedDays = validDays.includes(days) ? days : 30;
    
    const endAt = Date.now();
    const startAt = endAt - (selectedDays * 24 * 60 * 60 * 1000);
    
    const baseUrl = `${process.env.UMAMI_URL}/websites/${process.env.UMAMI_WEBSITE_ID}`;
    const headers = {
      'x-umami-api-key': process.env.UMAMI_API_KEY,
      'Accept': 'application/json'
    };

    // Helper function for API calls
    const fetchUmamiData = async (endpoint) => {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, { headers });
        
        if (!response.ok) {
          console.error(`Error fetching ${endpoint}: ${response.status}`);
          return null;
        }
        
        return await response.json();
      } catch (err) {
        console.error(`Fetch error for ${endpoint}:`, err);
        return null;
      }
    };

    // Fetch stats and individual metrics
    const [statsData, countriesRes, osRes, browsersRes, devicesRes] = await Promise.all([
      fetchUmamiData(`/stats?startAt=${startAt}&endAt=${endAt}`),
      fetchUmamiData(`/metrics?startAt=${startAt}&endAt=${endAt}&type=country`),
      fetchUmamiData(`/metrics?startAt=${startAt}&endAt=${endAt}&type=os`),
      fetchUmamiData(`/metrics?startAt=${startAt}&endAt=${endAt}&type=browser`),
      fetchUmamiData(`/metrics?startAt=${startAt}&endAt=${endAt}&type=device`)
    ]);

    // Parse metrics data - Umami returns { data: Array } structure
    const parseMetrics = (res) => {
      if (!res) return [];
      if (Array.isArray(res)) return res;
      if (res.data && Array.isArray(res.data)) return res.data;
      return [];
    };

    const countries = parseMetrics(countriesRes).map(item => ({
      x: item.x || 'Unknown',
      y: item.y || 0,
      percentage: 0
    }));

    const operatingSystems = parseMetrics(osRes).map(item => ({
      x: item.x || 'Unknown',
      y: item.y || 0,
      percentage: 0
    }));

    const browsers = parseMetrics(browsersRes).map(item => ({
      x: item.x || 'Unknown',
      y: item.y || 0,
      percentage: 0
    }));

    const devices = parseMetrics(devicesRes).map(item => ({
      x: item.x || 'Unknown',
      y: item.y || 0,
      percentage: 0
    }));

    // Build consistent stats structure
    const formattedStats = {
      visits: {
        value: statsData?.pageviews || statsData?.visits || 0
      },
      visitors: {
        value: statsData?.uniques || statsData?.visitors || 0
      },
      totaltime: {
        value: statsData?.totaltime || 0
      }
    };

    // Build response matching component expectations
    const combinedData = {
      activeUsers: 0, // This should come from a real-time source if available
      stats: formattedStats,
      countries,
      operatingSystems,
      browsers,
      devices,
      sessionDuration: formattedStats.totaltime.value / (formattedStats.visits.value || 1)
    };

    console.log('Analytics data retrieved successfully');
    
    return NextResponse.json(combinedData);

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({
      error: 'Failed to fetch analytics data',
      details: error.message
    }, { status: 500 });
  }
}