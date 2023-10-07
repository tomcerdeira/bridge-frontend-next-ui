import CardSectionByFlow from "@/components/analytics-card-section/cardSectionByFlow";


export default async function FlowPage({ params: { flowId } }: { params: { flowId: string } }) {
    return (
		<>
        {!flowId? (
                <div className="flex flex-col h-full justify-center items-center gap-10">
                <div className="gap-2 flex flex-col md:flex-row justify-center">
                    <p style={{ fontSize: "24px" }}>Cargando...</p>
                </div>
            </div>
        )
        :
        (
            <>
                <div className="mt-4 mx-4 mb-4 flex flex-col gap-4">
                    <CardSectionByFlow flowId={flowId}/>
                </div>
            </>
        )
        }
        </>
    )
  }