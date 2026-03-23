import FilterMenu from "../common/FilterMenu";
import { experienceLevelFilterOptionData } from "../../data/experienceLevelFilterOptionData";
import { jobTypeOptionData } from "../../data/jobTypeOptionData";
import { salaryRangeOptionData } from "../../data/salaryRangeOptionData";
import { skillsOptionData } from "../../data/skillsOptionData";
import { memo } from "react";
import ClearFilters from "../common/ClearFilters";

const JobFiltersContainer = memo(function JobFiltersContainer({
    handleSetQueryFilter,
    clearFiltersKey,
}) {
    return (
        <div className="border-border flex flex-wrap items-center gap-2 border-t pt-4">
            <span className="text-muted-foreground mr-2 text-sm font-medium">
                Filters:
            </span>
            <div className="flex items-center gap-2 w-full">
                <FilterMenu
                    key={`job-type-${clearFiltersKey}`}
                    selectTitle="Job Type"
                    inputType="checkbox"
                    itemsData={jobTypeOptionData}
                    name="job-type"
                    handleSetQueryFilter={handleSetQueryFilter}
                />
                <FilterMenu
                    key={`experience-lavel-${clearFiltersKey}`}
                    selectTitle="Experience Lavel"
                    inputType="checkbox"
                    itemsData={experienceLevelFilterOptionData}
                    name="experience-lavel"
                    handleSetQueryFilter={handleSetQueryFilter}
                />
                <FilterMenu
                    key={`salary-range-${clearFiltersKey}`}
                    selectTitle="Salary Range"
                    inputType="radio"
                    itemsData={salaryRangeOptionData}
                    name="salary-range"
                    handleSetQueryFilter={handleSetQueryFilter}
                />
                <FilterMenu
                    key={`skills-${clearFiltersKey}`}
                    selectTitle="Skills"
                    inputType="checkbox"
                    itemsData={skillsOptionData}
                    name="skills"
                    handleSetQueryFilter={handleSetQueryFilter}
                />
                <ClearFilters />
            </div>
        </div>
    );
});

export default JobFiltersContainer;
