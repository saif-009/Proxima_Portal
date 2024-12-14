'use client'

import LocationSelector from "../LocationSelector"
import ReviewCard from "./ReviewCard"


const Section = () => {
	return (
		<>
			<div className="flex flex-col p-8 gap-10 ">
				<div className="flex flex-row justify-end">
					Ref no - 1234567890
				</div>
				<LocationSelector />
				<div className="flex flex-row justify-end">
					<ReviewCard />
				</div>
				
			</div>
			
		</>
	)
}

export default Section