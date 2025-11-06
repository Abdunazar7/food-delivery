import { PartialType } from "@nestjs/swagger";
import { CreateItemCategoryDto } from "./create-item_category.dto";

export class UpdateItemCategoryDto extends PartialType(CreateItemCategoryDto) {}
