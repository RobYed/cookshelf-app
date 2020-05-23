/**
 * This interface forces typescript to differentiate between
 * two IDs which use a different generic type.
 *
 * @example
 * export interface Person {
 *   id: PersonId;
 *   address: Address;
 * }
 * export interface Address {
 *   id: AddressId;
 * }
 *
 * const a: Address = { id: 'some-address-id' };
 * const p: Person = { id: 'some-person-id', address: a };
 *
 * p.id = a.id; // TS: Type 'AddressId' is not assignable to type 'PersonId'.
 */
export interface Id<T> extends String {
  __idTypeFor?: T;
}
