import {
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
	Breadcrumb as BreadcrumbUI,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbStore } from "@/hooks/stores";

export function Breadcrumb() {
	return (
		<BreadcrumbUI>
			<BreadcrumbList>
				<BreadcrumbItem className="hidden md:block">
					<BreadcrumbLink href="/">RTS</BreadcrumbLink>
				</BreadcrumbItem>
				{useBreadcrumbStore.getState().breadcrumb.map((item, index) => (
					<>
						<BreadcrumbSeparator className="hidden md:block" />
						<BreadcrumbItem>
							<BreadcrumbPage>
								{
									useBreadcrumbStore.getState().breadcrumb[
										index
									]
								}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</>
				))}
			</BreadcrumbList>
		</BreadcrumbUI>
	);
}
