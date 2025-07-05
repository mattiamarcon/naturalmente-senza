"use client"

import { useEffect, useState } from "react"
import { Users, Eye, Globe, Monitor, Smartphone, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { DashboardSkeleton } from "@/app/components/backOffice/skeletonStats"
import { useRouter } from "next/navigation"

interface webSiteData{
  activeUsers:number,
  stats:{
    visits:{
      value:number
    },
    visitors:{
      value:number
    }
    totaltime:{
      value:number
    }
  }
  countries:stats[],
  operatingSystems:stats[],
  devices:stats[],
  browsers:stats[],
  sessionDuration:number,
}

interface stats{
  x:string,
  y:number,
  percentage:number,
}

export default function Dashboard() {

  const [data, setData] = useState<webSiteData>();
  const [activeUsers,setActiveUsers]=useState(0);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7")

  const router= useRouter();

  useEffect(()=>{

    setLoading(true);

    async function getData(){

      const res=await fetch(`/api/analytics?days=${timeRange}`);
      const stats=await res.json();

      console.log(stats)

      setData(stats);

      setLoading(false)
    }

    async function getActiveUsers(){
      const res=await fetch('/api/activeUsers');
      const active=await res.json();

      setActiveUsers(active)
    }

    getData();
    getActiveUsers();
  },[timeRange]);

  useEffect(()=>{
    function setPercentage(){

      calcPercentageOS();
      calcPercentageDevices();
      calcPercentageBrowsers();
      calcPercentageCountries();

    }  
 
    setPercentage();
    router.refresh();
  },[data]);

  function calcPercentageOS(){

    if(data){
      const os=data.operatingSystems;
      let SumC=0;

      os.forEach(c=>{
        SumC+=c.y;
      })
 

      data.operatingSystems.forEach(c=>{
        c.percentage=(c.y/SumC)*100;
      })
    }
  }

  function calcPercentageDevices(){

    if(data){
      const devices=data.devices;
      let SumC=0;

      devices.forEach(c=>{
        SumC+=c.y;
      })

      data.devices.forEach(c=>{
        c.percentage=(c.y/SumC)*100;
      })
    }

  }

  function calcPercentageBrowsers(){

    if(data){
      const browsers=data.browsers;
      let SumC=0;

      browsers.forEach(c=>{
        SumC+=c.y;
      })

      data.browsers.forEach(c=>{
        c.percentage=(c.y/SumC)*100;
      })
    }
  }

  function calcPercentageCountries(){
 
    if(data){
      const countries=data.countries;
      let SumC=0;

      countries.forEach(c=>{
        SumC+=c.y;
      })

      data.countries.forEach(c=>{
        c.percentage=(c.y/SumC)*100;
      })
    }
  }

  if(loading){
    return ( <DashboardSkeleton />)
  }


    if(data){
      return (
      <div className="min-h-screen bg-gray-50 font-title">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <div className="flex items-center space-x-4 font-title py-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem className="bg-white font-title" value="1">24 ore</SelectItem>
                    <SelectItem className="bg-white font-title" value="7">7 giorni</SelectItem>
                    <SelectItem className="bg-white font-title" value="30">30 giorni</SelectItem>
                </SelectContent>
                </Select>
            </div>

              {/* Metriche principali */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="py-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Utenti Attivi</CardTitle>
                    <Users className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{activeUsers}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="inline-flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                        Online ora
                      </span>
                    </p>
                  </CardContent>
                </Card>

                <Card className="py-3">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {
                        timeRange=="1"?"Visitatori ultime 24h":
                        timeRange=="7"?"Visitatori ultimi 7 giorni":
                        timeRange=="30"?"Visitatori ultimi 30 giorni":""
                      }
                      </CardTitle>
                    <Eye className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{data.stats.visitors.value}</div>
                  </CardContent>
                </Card>

              </div>

              {/* Grafici e statistiche dettagliate */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-3">
                {/* Paesi */}
                <Card className="py-3">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Paesi
                    </CardTitle>
                    <CardDescription>Visitatori per paese</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.countries.map((country, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-5 bg-gray-200 rounded-sm flex items-center justify-center text-xs">
                            {country.x.slice(0, 2).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium">{country.x}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${country.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">{country.y}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Sistemi Operativi */}
                <Card className="py-3">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Monitor className="h-5 w-5 mr-2" />
                      Sistemi Operativi
                    </CardTitle>
                    <CardDescription>Distribuzione per OS</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.operatingSystems.map((os, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{os.x}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{ width: `${os.percentage}%` }}></div>
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">{os.y}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Dispositivi */}
                <Card className="py-3">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Smartphone className="h-5 w-5 mr-2" />
                      Dispositivi
                    </CardTitle>
                    <CardDescription>Tipo di dispositivo utilizzato</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.devices.map((device, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{device.x}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{ width: `${device.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">{device.y}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Browser */}
                <Card className="py-3">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Browser
                    </CardTitle>
                    <CardDescription>Browser più utilizzati</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {data.browsers.map((browser, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{browser.x}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full"
                              style={{ width: `${browser.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-muted-foreground w-12 text-right">{browser.y}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Durata delle sessioni */}
              <Card className="py-3">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Durata delle Sessioni
                  </CardTitle>
                  <CardDescription>
                    Tempo medio di permanenza: <strong>{(data.stats.totaltime.value/data.stats.visits.value).toFixed(1)} secondi</strong>
                  </CardDescription>
                </CardHeader>
                
              </Card>
        </div>
      </div>
    )
  }

}
