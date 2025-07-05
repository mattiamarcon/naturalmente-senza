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

    // Funzione helper per fare le chiamate API
    const fetchUmamiData = async (endpoint) => {
      const response = await fetch(`${baseUrl}${endpoint}`, { headers });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log(`Error fetching ${endpoint}:`, errorText);
        return null;
      }
      
      return await response.json();
    };

    // Chiamate parallele per tutti i dati
    const [
      statsData,
      metricsData
    ] = await Promise.all([
      // Statistiche generali
      fetchUmamiData(`/stats?startAt=${startAt}&endAt=${endAt}`),
      
      // Metriche dettagliate (singola chiamata che include tutto)
      fetchUmamiData(`/metrics?startAt=${startAt}&endAt=${endAt}&type=country,os,browser,device,page,referrer`)
    ]);

    // Se la chiamata metrics non funziona, proviamo con le chiamate individuali
    let countriesData, osData, browsersData, devicesData, pagesData, referrersData;
    
    if (!metricsData) {
      console.log('Trying individual metric calls...');
      [
        countriesData,
        osData,
        browsersData,
        devicesData,
        pagesData,
        referrersData
      ] = await Promise.all([
        fetchUmamiData(`/metrics?startAt=${startAt}&endAt=${endAt}&type=country`),
        fetchUmamiData(`/metrics?startAt=${startAt}&endAt=${endAt}&type=os`),
        fetchUmamiData(`/metrics?startAt=${startAt}&endAt=${endAt}&type=browser`),
        fetchUmamiData(`/metrics?startAt=${startAt}&endAt=${endAt}&type=device`),
        fetchUmamiData(`/metrics?startAt=${startAt}&endAt=${endAt}&type=page`),
        fetchUmamiData(`/metrics?startAt=${startAt}&endAt=${endAt}&type=referrer`)
      ]);
    } else {
      // Estrai i dati dalla chiamata combinata
      countriesData = metricsData.filter(item => item.type === 'country');
      osData = metricsData.filter(item => item.type === 'os');
      browsersData = metricsData.filter(item => item.type === 'browser');
      devicesData = metricsData.filter(item => item.type === 'device');
      pagesData = metricsData.filter(item => item.type === 'page');
      referrersData = metricsData.filter(item => item.type === 'referrer');
    }

    // Costruisci la risposta combinata
    const combinedData = {
      period: {
        startAt,
        endAt,
        days: 30
      },
      stats: statsData,
      countries: countriesData,
      operatingSystems: osData,
      browsers: browsersData,
      devices: devicesData,
      pages: pagesData,
      referrers: referrersData
    };

    console.log('Combined analytics data retrieved successfully');
    
    return NextResponse.json(combinedData);

  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({
      error: 'Failed to fetch analytics data',
      details: error.message
    }, { status: 500 });
  }
}