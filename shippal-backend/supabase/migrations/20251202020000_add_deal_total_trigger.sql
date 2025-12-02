-- Function to calculate deal total
CREATE OR REPLACE FUNCTION calculate_deal_total()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE deals
    SET total_amount = (
        SELECT COALESCE(SUM(quantity * price_per_unit), 0)
        FROM deal_items
        WHERE deal_id = COALESCE(NEW.deal_id, OLD.deal_id)
    )
    WHERE id = COALESCE(NEW.deal_id, OLD.deal_id);
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update deal total on item changes
DROP TRIGGER IF EXISTS on_deal_item_change ON deal_items;
CREATE TRIGGER on_deal_item_change
AFTER INSERT OR UPDATE OR DELETE ON deal_items
FOR EACH ROW
EXECUTE FUNCTION calculate_deal_total();
