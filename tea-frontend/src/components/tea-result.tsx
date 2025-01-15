import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";

function TeaStep({title, value}: {title: string, value: string}) {
    return (
    <><div className="inline-block flex content-center justify-between w-64">
    <span>{title}</span>
    <span>{value}</span>
</div>
<Separator /></>)
}

function TeaError() {
    return <div className='bg-destructive text-destructive-foreground w-64 p-5 rounded-lg'>
    <span className="text-lg font-semibold">Error</span>
    <p>Could not make tea</p>
</div>
}


function TeaSteps({result}: {result: any})  {
    return  <div className="w-64">
    <TeaStep title="Steeping Time" value={`${result.steepingTime} min`} />
    <TeaStep title="Water Amount" value={`${result.water.amount}`} />
    <TeaStep title="Water Tempreture" value={`${result.water.temperature} °C`} />
    <TeaStep title="Tea Leaves Name" value={result.teaLeaf.name} />
    <TeaStep title="Tea Leaves Type" value={result.teaLeaf.type} />
    <TeaStep title="Tea Leaves Type" value={`${result.teaLeaf.amount} g`} />
</div>
}

function TeaResult({result, error}: {result: any|null, error: boolean}) {
    console.log('result', {result, error})
    
    return <>
        <Card>
            <CardHeader>
                <CardTitle>
                   {(error) ? null : ` ${result.water.amount} - ${result.teaLeaf.name}` }
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
                {
                    (error )? (<TeaError />)
                    : (<TeaSteps result={result } />)
                }
                
            </CardContent>
        </Card>
    </>
}

export default TeaResult;