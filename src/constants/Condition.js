export class Condition {
  static Mint = new Condition("Mint / Never Opened");
  static Excellent = new Condition("Excellent / Minimal Wear");
  static Good = new Condition("Good / Noticeable Wear");
  static Damaged = new Condition("Damaged");
  static Refurbished = new Condition("Refurbished by Seller");

  constructor(name) {
    this.name = name;
  }
}
