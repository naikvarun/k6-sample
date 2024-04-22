import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, SelectLabel } from "./ui/select";
import { useState, useEffect} from 'react'
import { Separator } from "./ui/separator";
import TeaResult from "./tea-result";
function TeaHouse() {
    const [tea, setTea] = useState<string[]>( []);
    const [waterAmount, setWaterAmount] = useState<{amount: string, size: string}[]>([ ])
    const [selectedTea, setSelectedTea] = useState<string>('');
    const [selectedAmount, setSelectedAmount] = useState<string>('')
    const [result, setResult] = useState<any | null>(null);
    const [error, setError] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        fetch('http://localhost:8090/api/steep')
        .then(response => response.json())
        .then(data => {
            setTea(data.teaLeaves.map(t=>t.name))
            setWaterAmount(data.water.map(w=>({size: w.size, amount: w.amount})))

        })
    }, []);

    function steepTea() {
        console.log({selectedAmount, selectedTea});
       setResult(null)
       setError(false);
       setVisible(false)
        const url = new URL('http://localhost:8090/api/tea/make')
        url.searchParams.append('name', selectedTea);
        url.searchParams.append('size', selectedAmount);
        fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error('Couldnot make tea');
        })
        .then(data => {
            setError(false)
            setResult(data)
            setVisible(true)
        })
        .catch((err) => {
            setError(true)
            setResult(null)
            setVisible(true)
        });
    }

    return <><Card>
        <CardContent  >
        <div className="flex content-center justify-center p-3 gap-5">
            <div>
            <Label>Tea Leaf</Label>
            </div>
            <div  className="w-64">
        <Select value={selectedTea} onValueChange={(e) => setSelectedTea(e)}>
      <SelectTrigger>
        <SelectValue placeholder="Select a Tea" />
      </SelectTrigger>
      <SelectContent>
        {
            tea.filter(t => t !== 'english breakfast').map((t: string, i: number) => <SelectItem value={t} key={i}>{t}</SelectItem>)
        }
         <SelectItem value="english breakfast">english breakfast (!)</SelectItem>
          
      </SelectContent>
    </Select>
    </div>
    </div>
        </CardContent>
    </Card>

    <Card>
        <CardContent >
           
        <div className="flex content-center justify-center p-3 gap-5">
            <div>
            <Label>Size</Label>
            </div>
            <div  className="w-64">
        <Select value={selectedAmount} onValueChange={setSelectedAmount}>
      <SelectTrigger>
        <SelectValue placeholder="Tea Size" />
      </SelectTrigger>
      <SelectContent>
        {
            waterAmount.map((w: {amount: string, size: string}, i: number) => <SelectItem value={w.size} key={i}>{w.size} - ({w.amount}) </SelectItem>)
           
        }
          
      </SelectContent>
    </Select>
    </div>
    </div>
        </CardContent>
    </Card>
    <Button onClick={steepTea}>Steep it!</Button>
    <div>
       {visible ? <TeaResult result={result} error={error} /> : null }
    </div>
    </>
}
export default TeaHouse;